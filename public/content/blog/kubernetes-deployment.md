---
title: "Kubernetes Deployment Strategies for Production"
date: "2024-01-10"
excerpt: "Complete guide to deploying applications on Kubernetes with advanced deployment strategies, monitoring, and best practices."
author: "Rajesh Avhad"
tags: ["Kubernetes", "DevOps", "Cloud", "Orchestration"]
image: "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=600"
category: "Cloud"
featured: true
readTime: "12 min read"
---

# Kubernetes Deployment Strategies for Production

Kubernetes has become the de facto standard for container orchestration. In this comprehensive guide, I'll share production-tested strategies for deploying applications on Kubernetes clusters.

## Why Kubernetes?

Kubernetes provides:
- **Automated deployment and scaling**
- **Service discovery and load balancing**
- **Storage orchestration**
- **Self-healing capabilities**
- **Configuration management**

## Basic Deployment Configuration

Here's a production-ready deployment configuration:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  namespace: production
  labels:
    app: web-app
    version: v1.0.0
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
        version: v1.0.0
    spec:
      containers:
      - name: web-app
        image: myregistry/web-app:v1.0.0
        ports:
        - containerPort: 3000
          name: http
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
        securityContext:
          allowPrivilegeEscalation: false
          runAsNonRoot: true
          runAsUser: 1001
      securityContext:
        fsGroup: 1001
```

## Service and Ingress Configuration

```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: web-app-service
  namespace: production
spec:
  selector:
    app: web-app
  ports:
  - port: 80
    targetPort: 3000
    name: http
  type: ClusterIP

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-app-ingress
  namespace: production
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - api.example.com
    secretName: web-app-tls
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-app-service
            port:
              number: 80
```

## Advanced Deployment Strategies

### 1. Rolling Updates
```yaml
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  replicas: 5
```

### 2. Blue-Green Deployment
```yaml
# Blue deployment (current)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app-blue
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
      version: blue
  template:
    metadata:
      labels:
        app: web-app
        version: blue
    spec:
      containers:
      - name: web-app
        image: myregistry/web-app:v1.0.0

---
# Green deployment (new version)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app-green
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
      version: green
  template:
    metadata:
      labels:
        app: web-app
        version: green
    spec:
      containers:
      - name: web-app
        image: myregistry/web-app:v2.0.0
```

### 3. Canary Deployment with Istio
```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: web-app-canary
spec:
  hosts:
  - api.example.com
  http:
  - match:
    - headers:
        canary:
          exact: "true"
    route:
    - destination:
        host: web-app-service
        subset: v2
      weight: 100
  - route:
    - destination:
        host: web-app-service
        subset: v1
      weight: 90
    - destination:
        host: web-app-service
        subset: v2
      weight: 10
```

## ConfigMaps and Secrets Management

```yaml
# ConfigMap for application configuration
apiVersion: v1
kind: ConfigMap
metadata:
  name: web-app-config
  namespace: production
data:
  app.properties: |
    server.port=3000
    logging.level=info
    cache.ttl=3600
  nginx.conf: |
    server {
        listen 80;
        location / {
            proxy_pass http://backend;
        }
    }

---
# Secret for sensitive data
apiVersion: v1
kind: Secret
metadata:
  name: web-app-secrets
  namespace: production
type: Opaque
data:
  database-url: <base64-encoded-value>
  api-key: <base64-encoded-value>
```

## Horizontal Pod Autoscaler

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-app-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 3
  maxReplicas: 50
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15
      - type: Pods
        value: 4
        periodSeconds: 15
      selectPolicy: Max
```

## Persistent Storage

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: web-app-storage
  namespace: production
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: fast-ssd

---
# Using PVC in deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: database
spec:
  template:
    spec:
      containers:
      - name: postgres
        image: postgres:15
        volumeMounts:
        - name: data
          mountPath: /var/lib/postgresql/data
      volumes:
      - name: data
        persistentVolumeClaim:
          claimName: web-app-storage
```

## Monitoring with Prometheus

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web-app-metrics
  labels:
    app: web-app
  annotations:
    prometheus.io/scrape: "true"
    prometheus.io/port: "3000"
    prometheus.io/path: "/metrics"
spec:
  ports:
  - port: 3000
    name: metrics
  selector:
    app: web-app

---
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: web-app-monitor
spec:
  selector:
    matchLabels:
      app: web-app
  endpoints:
  - port: metrics
    path: /metrics
    interval: 30s
```

## Security Best Practices

### 1. Network Policies
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: web-app-netpol
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: web-app
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 3000
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: database
    ports:
    - protocol: TCP
      port: 5432
```

### 2. Pod Security Standards
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
```

### 3. RBAC Configuration
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: production
  name: web-app-role
rules:
- apiGroups: [""]
  resources: ["configmaps", "secrets"]
  verbs: ["get", "list"]
- apiGroups: ["apps"]
  resources: ["deployments"]
  verbs: ["get", "list", "update"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: web-app-binding
  namespace: production
subjects:
- kind: ServiceAccount
  name: web-app-sa
  namespace: production
roleRef:
  kind: Role
  name: web-app-role
  apiGroup: rbac.authorization.k8s.io
```

## GitOps with ArgoCD

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: web-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/myorg/web-app-manifests
    targetRevision: HEAD
    path: production
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
    - CreateNamespace=true
```

## Troubleshooting Commands

```bash
# Check pod status
kubectl get pods -n production

# Describe pod for events
kubectl describe pod <pod-name> -n production

# Check logs
kubectl logs -f <pod-name> -n production

# Execute into pod
kubectl exec -it <pod-name> -n production -- /bin/bash

# Port forward for debugging
kubectl port-forward <pod-name> 8080:3000 -n production

# Check resource usage
kubectl top pods -n production
kubectl top nodes

# Check events
kubectl get events -n production --sort-by='.lastTimestamp'
```

## Performance Optimization

### Resource Quotas
```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: production-quota
  namespace: production
spec:
  hard:
    requests.cpu: "10"
    requests.memory: 20Gi
    limits.cpu: "20"
    limits.memory: 40Gi
    pods: "20"
    services: "10"
```

### Limit Ranges
```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: production-limits
  namespace: production
spec:
  limits:
  - default:
      memory: "512Mi"
      cpu: "500m"
    defaultRequest:
      memory: "256Mi"
      cpu: "250m"
    type: Container
```

## Backup and Disaster Recovery

```yaml
# Velero backup
apiVersion: velero.io/v1
kind: Backup
metadata:
  name: production-backup
spec:
  includedNamespaces:
  - production
  storageLocation: aws-backup
  ttl: 720h0m0s
  hooks:
    resources:
    - name: database-backup
      includedNamespaces:
      - production
      labelSelector:
        matchLabels:
          app: postgres
      pre:
      - exec:
          command:
          - /bin/bash
          - -c
          - pg_dump mydb > /backup/dump.sql
```

## Conclusion

Kubernetes deployment strategies require careful planning and implementation. Key takeaways:

1. **Start with basic deployments** and gradually adopt advanced patterns
2. **Implement proper monitoring** from day one
3. **Security should be built-in**, not bolted on
4. **Use GitOps** for declarative deployments
5. **Plan for disaster recovery** and backup strategies

Production Kubernetes deployments are complex, but following these patterns will help you build robust, scalable applications.

---

*Ready to containerize your applications? Check out my [Docker Containers Guide](/blog/docker-containers) to get started with the basics.*