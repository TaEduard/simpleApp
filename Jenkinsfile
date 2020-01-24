pipeline {
  agent any
  stages {
     stage('Docker Clean System') {
      steps {
        sh "docker system prune -f"
      }
    }
    stage('Docker Build') {
      steps {
        sh "docker build -t backend:latest ./backend/"
        sh "docker build -t backend:latest ./frontend/"
      }
    }
    stage('Docker Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
          sh "docker image tag backend:latest ${env.dockerHubUser}/backend:${env.BUILD_NUMBER}"
          sh "docker image tag backend:latest ${env.dockerHubUser}/frontend:${env.BUILD_NUMBER}"
          sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
          sh "docker push ${env.dockerHubUser}/backend:${env.BUILD_NUMBER}"
          sh "docker push ${env.dockerHubUser}/frontend:${env.BUILD_NUMBER}"
          sh "export DOCKERUSER=${env.dockerHubUser}"
        }
      }
    }
    stage('Docker Remove Image') {
      steps {
        sh "docker rmi botaccount123/backend:${env.BUILD_NUMBER}"
        sh "docker rmi botaccount123/frontend:${env.BUILD_NUMBER}"
      }
    }
    stage('Apply Kubernetes Files') {
      steps {
          withKubeConfig([credentialsId: 'kubeconfig']) {
          sh 'cat backend/backend.yaml | sed "s/{{DOCKERHUBUSER}}/$DOCKERUSER/g" | sed "s/{{BUILD_NUMBER}}/$BUILD_NUMBER/g" | kubectl apply -f -'
          sh 'export NODE_NAME=$(kubectl describe pod backend | "grep Node:" | sed "s/Node:\\s*//g")'
          sh 'export BACKEND_PORT=$(kubectl describe svc backend | grep "NodePort:" | sed "s/NodePort:\s*backend-port\s*//g" | sed "s/\/TCP//g")'
          sh 'export BACKEND_URL="${NODE_NAME}:${BACKEND_PORT}"'
          sh 'cat frontend/frontend.yaml | sed "s/{{DOCKERHUBUSER}}/$DOCKERUSER/g" | sed "s/{{BUILD_NUMBER}}/$BUILD_NUMBER/g" | sed "s/{{BACKEND}}/$BACKEND_URL/g" | kubectl apply -f -'
        }
      }
    }
  }
}
