pipeline{
    agent any
    environment {
        IMAGE_NAME = 'projetointegrador5b'
        IMAGE_TAG = 'latest'
        APP_NAME = 'projetointegrador5b'
    }
    stages{
        stage('Build'){
            steps{
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
            }
        }
        stage('Teste'){
            steps{
                echo '"Testing"'
            }
        }
        stage('Deploy'){
            steps{
                sh 'sudo docker run -d --restart=unless-stopped --name projetointegrador5b -p 5175:3000 projetointegrador5b'
            }
        }
    }
}
