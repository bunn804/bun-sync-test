node{

    stage 'checkout'
        checkout scm
        echo 'check out'
    
    stage 'check java'
        sh "java -version"
    
    stage 'check environment'
        sh "node -v"
        sh "npm -v"
        sh "gulp -v"
        
    stage 'install packages'
        sh "npm install gulp"
        sh "npm install gulp-upload"
        sh "npm install vinyl-ftp"
        sh "npm install gulp-util"
	
	/*
	*post{
	*	always{
	*		echo 'this is post'
	*	}
	*}
	*
	*
	*stage 'testUpload'
	*sh "gulp deploy"
	*
	*stage('check gulp'){
    *    sh "gulp -v"
    *}
    *
	*agent {
	*	docker {
	*		image 'node:9.5.0' 
	*		args '-p 3000:3000'
	*	}
	*}
	*
	*tools {nodejs "Node-9.5.0"}
    *
    *stage 'check environment'
    *sh "node -v"
    *sh "npm -v"
    *sh "gulp -v"
    *
    *stage 'checkout'
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
    *sh "./mvnw package -Pprod -DskipTests"
    */
}