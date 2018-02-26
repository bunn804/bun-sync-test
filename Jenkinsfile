node{

    stage 'checkout'
        checkout scm
        echo 'check out'
    
    stage 'check java'
        sh "java -version"
        
    stage 'install packages'
        sh "npm install gulp"
        sh "npm install gulp-upload"
        sh "npm install vinyl-ftp"
        sh "npm install gulp-util"
    
    stage 'check environment'
        sh "node -v"
        sh "npm -v"
        sh "gulp -v"
        sh "curl --version"
        
    stage 'ls folder'
        sh "ls"
        
    stage 'FTP Upload'
        withCredentials([usernameColonPassword(credentialsId: 'FTPLogin', variable: 'LOGIN')]) {
            sh "curl -T gulpfile.js ftp://192.168.1.125 \
            --user $LOGIN"
    }
	
    /*
    *stage 'install packages'
    *    sh "npm install gulp"
    *    sh "npm install gulp-upload"
    *    sh "npm install vinyl-ftp"
    *
    */
	
	/*
	*post{
	*	always{
	*		echo 'this is post'
	*	}
	*}
	*
	*
	*stage 'testUpload'
	*sh "npm install gulp-util"
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