pipeline{
    agent any
    environment {
        IMAGE_NAME = 'projetointegrador5b'
        IMAGE_TAG = 'latest'
        APP_NAME = 'projetointegrador5b'
    }
    stages{
        stage('Clean up'){
            steps{
                script{
                    try{
                        sh 'docker container stop $APP_NAME'
                    }catch (Exception e){}
                    try{
                        sh 'docker container rm $APP_NAME'
                    }catch (Exception e){}
                    try{
                        sh 'docker image rm $IMAGE_NAME:$IMAGE_TAG'
                    }catch (Exception e){}
                }
            }
        }
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
                sh 'docker run -d --restart=unless-stopped --name $APP_NAME -p 5175:3000 $IMAGE_NAME'
            }
        }
    }
}
