# Hi and Welcome to my Camunda Project

## Agenda
1. Introduction 
2. Architecture
3. How I did it?
4. How to run the app? (with npm and docker)

## Introduction
To do this project I choose React with Typescript to build a quick frontend. 
For the storage I decided to go for a cloud blob storage option (supabase) that is for me the simpliest way to store images. 
Supabase is a very easy & free way to set up a blob storage for small projects.
=> I also though it would make sense to use a cloud storage because I guess that it is relevent to the daily work at Camunda. 

## Architecture of the project 
A react Project using typescript with supabase storage as a backend
Nothing to fancy here but just wanted to make an image for visualization
<img width="621" height="331" alt="camunda (1)" src="https://github.com/user-attachments/assets/b66e8cf1-b0db-403a-b11e-d5759ed875bc" />


## How I did it?
1. First to create a React project you must install [node](https://nodejs.org/fr/download) on your pc.
Then go to your folder and type this command
```
npm create vite@latest my-app
```
then 
```
cd my-app 
npm install 
npm run dev 
```
:) 
2. code the frontend
Only in the first page app.tsx to stay simple

3.Connect with the Supabase Storage
Had to create a free Supabase account, get the credentials and connect to the storage.
Connect to the code and create the function with the request 

4.Create the Dockerfile 
Create the dockerfile and test if it's run  

## How to run the app? (with npm and docker)
1. First Option with Docker 
Install the application and go to the root of the app and lauch this command
```
docker build -t my-react-app . 
docker run -p 5173:5173 my-react-app 
```
2. With your local machine
You clone the code and do this two steps:
```
npm install
npm run dev
```
You need to have node install for this option!

