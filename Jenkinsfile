pipeline {
  agent any
  stages {
    stage('Apply Kubernetes Files') {
      steps {
          withKubeConfig([credentialsId: 'kubeconfig']) {
          sh "kubectl config view"
          sh "rm configure* || true"
          sh "wget https://gist.githubusercontent.com/TaEduard/427a16d1d525c1cfbc9c2d4d409cbefd/raw/522b92a1890ab96428068079fe273fba9b46260f/configure-host.sh"
          sh "chmod 777 configure-host.sh"
          sh "./configure-host.sh"
        }
      }
    }
    stage('Docker Build') {
      steps {
        sh "docker build -t myimage ./backend/Dockerfile"
        sh "docker tag myimage trow.kube-public:31000/myimage:mytag"
        sh "docker push trow.kube-public:31000/myimage:mytag"
      }
    }
  }
}
