pipeline {
  agent any
  stages {
     stage('Docker Clean system') {
      steps {
        sh "docker system prune -f"
      }
    }
    stage('Docker Build') {
      steps {
        sh "docker build -t botaccount123/backend:${env.BUILD_NUMBER} ./backend/"
        sh "docker build -t botaccount123/backend:${env.BUILD_NUMBER} ./frontend/"
      }
    }
    stage('Docker Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
          sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
          sh "docker push botaccount123/backend:${env.BUILD_NUMBER}"
          sh "docker push botaccount123/frontend:${env.BUILD_NUMBER}"
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
          sh 'cat backend/backend.yaml | sed "s/{{BUILD_NUMBER}}/$BUILD_NUMBER/g" | kubectl apply -f -'
          sh 'cat frontend/frontend.yaml | sed "s/{{BUILD_NUMBER}}/$BUILD_NUMBER/g" | kubectl apply -f -'
        }
      }
    }
  }
}
