# Hi and Welcome to my Camunda Project

## Agenda
1. Introduction 
2. Architecture
3. How I build it
4. How to run the app (with npm and docker)

## Introduction
To do this project, I choose **React with Typescript** in order to create a simple and fast frontend. 
For the storage, I decided to go for a **cloud blob storage option** (Supabase) which is in my opinion the simpliest way to store images. 
=> I also though it made sense to use a cloud storage since it is relevant to the daily work at Camunda. 

## Architecture of the project 
<img width="621" height="331" alt="camunda (1)" src="https://github.com/user-attachments/assets/b66e8cf1-b0db-403a-b11e-d5759ed875bc" />


## How I build it
1. Create a React Project

First install [Node.js](https://nodejs.org/fr/download) on your computer.
Then, go to your working directory and run:
```
npm create vite@latest my-app
```
Then: 
```
cd my-app 
npm install 
npm run dev 
```

2. Build the frontend

Everything is coded inside the main file App.tsx for simplicity 

3. Supabase Storage
    1. Create a free Supabase account
    2. Retrieve the credentials
    3. Connect it to the code and create the function with the request 

4) Create the Dockerfile 

## How to run the app (with npm, docker & online)

For the first two cases please clone to the project.

1. With Docker 

Navigate to the root of the project and run:
```
docker build -t my-react-app . 
docker run -p 5173:5173 my-react-app 
```
2. Run Locally

Navigate to the root of the project and run:
```
npm install
npm run dev
```
You need to have Node.js installed for this option!

3. Access the App through the internet

If none of those methods work (They both should).
I deployed the website with vercel. You should can access it through this [link](https://camunda-kappa.vercel.app/) 

