Three separate package.json files:

	1.	Root package.json:
	•	Contains scripts to install dependencies and run both the client and server concurrently.
	2.	Client package.json:
	•	Located in the client folder, it includes all dependencies and scripts specific to the React app.
	3.	Server package.json:
	•	Located in the server folder, it contains dependencies and scripts specific to the backend server.

Workflow After Cloning

	1.	Install all dependencies:

npm run install-all

	2.	Start both the client and server:

npm run start


This setup provides a modular and manageable structure, with separate package.json files for each part of the project while still allowing for easy management from the root.