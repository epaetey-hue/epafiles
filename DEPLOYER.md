# Comment déployer EpaFiles en ligne (gratuit)

## Option 1 — Netlify (la plus simple, recommandée)

1. Créer un compte gratuit sur https://netlify.com
2. Aller sur https://app.netlify.com/drop
3. Faire glisser le dossier `epafiles/` dans la zone indiquée
4. Netlify génère une URL du type : https://epafiles-xyz.netlify.app
5. Partager cette URL à tes utilisateurs

### Mettre à jour l'app pour tes utilisateurs

1. Ouvrir `sw.js`
2. Changer le numéro de version :
   ```
   const VERSION = 'epafiles-v2';  ← incrémenter à chaque modification
   ```
3. Modifier tes fichiers (app.js, styles.css, etc.)
4. Retourner sur Netlify → faire glisser à nouveau le dossier
5. ✅ Tous les utilisateurs reçoivent la mise à jour automatiquement
   (une bannière "Mise à jour disponible" apparaît dans l'app)

---

## Option 2 — GitHub Pages (gratuit, avec versioning)

1. Créer un compte sur https://github.com
2. Créer un nouveau dépôt public nommé `epafiles`
3. Uploader tous les fichiers du dossier
4. Aller dans Settings → Pages → Source: main branch
5. URL générée : https://ton-pseudo.github.io/epafiles

---

## Résumé du système de mise à jour automatique

```
Tu modifies les fichiers
        ↓
Tu incrémentes VERSION dans sw.js
        ↓
Tu uploades sur Netlify
        ↓
Le service worker détecte le nouveau cache
        ↓
Une bannière "🎉 Mise à jour disponible" s'affiche
        ↓
L'utilisateur appuie sur "Mettre à jour"
        ↓
L'app se recharge avec la nouvelle version ✅
```
