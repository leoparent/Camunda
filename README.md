# Hi and Welcome to my Camunda Project

## Agenda
1. Introduction 
2. Architecture
3. How I did it?
4. How to run the app? (with npm and docker)

## Introduction
To do this project I choose React with Typescript to build a quick frontend. 
For the storage I decided to go for a **cloud blob storage option** (supabase) that is for me the simpliest way to store images. 
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

2. code the frontend

Only in the first page app.tsx to stay simple

3. Supabase Storage
    1. Create a free Supabase account
    2. Get the credentials
    3. Connect it to the code and create the function with the request 

4) Create the Dockerfile 

## How to run the app? (with npm, docker & online)

In both case please clone to the project

1. First Option with Docker 

Install the application and go to the root of the app and type those commands
```
docker build -t my-react-app . 
docker run -p 5173:5173 my-react-app 
```
2. With your local machine

Go to the root of the project and type those commands
```
npm install
npm run dev
```
You need to have node install for this option!

3. Access the App through the internet

If none of this option are working (Both should work).
I deployed the website with vercel and you should be able to access it through this [link](https://camunda-kappa.vercel.app/) 

