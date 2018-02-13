node{

    stage('checkout') {
        checkout scm
    }

    stage('check java') {
        sh "java -version"
    }

	/*agent {
	*	docker {
	*		image 'node:9.5.0' 
	*		args '-p 3000:3000'
	*	}
	*}
	
	*tools {nodejs "Node-9.5.0"}

   *stage 'check environment'
   *sh "node -v"
   *sh "npm -v"
   */sh "gulp -v"

   /*stage 'checkout'
   *checkout scm
   *
   *stage 'npm install'
   *sh "npm install"
   *
   *stage 'clean'
   *sh "./mvnw clean"
   *
   *stage 'backend tests'
   *sh "./mvnw test"
   *
   *stage 'frontend tests'
   *sh "gulp test"
   *
   *stage 'packaging'
   */sh "./mvnw package -Pprod -DskipTests"
}