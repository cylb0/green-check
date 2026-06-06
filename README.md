# green-check
Plateforme intelligente de diagnostic et de suivi de santé végétale, conçue pour accompagner les utilisateurs dans l'entretien de leur écosystème végétal.

🚀 À propos
GreenCheck est une solution full-stack permettant d'analyser l'état de santé des plantes via une interface intuitive. Le projet combine la robustesse du framework Django pour le backend, la performance de React avec Vite pour le frontend, et la précision d'un microservice IA sous FastAPI.

🛠 Architecture Technique
Le projet suit une architecture modulaire (monorepo) conteneurisée :

Frontend : React 19 + TypeScript + Vite + Tailwind CSS (v4).

Backend : Django Framework.

IA Service : FastAPI (traitement d'images et diagnostic).

Infrastructure : Docker & Docker Compose (orchestration globale).

📋 Prérequis
Avant de commencer, assurez-vous d'avoir installé sur votre machine :

Docker & Docker Compose

Node.js (v24+)

Git

⚡ Démarrage Rapide
Cloner le dépôt :

Bash
git clone https://github.com/cylb0/green-check.git
cd green-check
Configuration des variables :
Copiez le fichier d'exemple et adaptez-le selon votre environnement :

Bash
cp .env.example .env
Lancer le projet :

Bash
docker-compose up --build
Accéder aux services :

Interface Web : http://localhost:5173

API Backend : http://localhost:8000

📁 Structure du Projet
Plaintext
/
├── backend/       # API Django
├── frontend/      # Client React
├── ia-service/    # Microservice de diagnostic IA
├── nginx/         # Reverse Proxy
├── docker-compose.yml
└── README.md

🤝 Contribution
Ce projet suit les principes du Clean Code et une gestion de commits normée (Conventional Commits).
Avant toute soumission de code, assurez-vous de passer les tests unitaires :

Backend : pytest

Frontend : npm run test

📜 Licence
Distribué sous licence MIT. Voir LICENSE pour plus d'informations.
