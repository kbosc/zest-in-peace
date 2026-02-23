# 🎴 Zest in Peace — Test Technique

Application de filtrage de sets Magic: The Gathering, construite à partir de l'API [MTGJson](https://mtgjson.com/).

---

## Stack

- **React** + **TypeScript**
- **Redux Toolkit** — gestion d'état
- **CSS Modules** — style scopé sans framework
- **Vitest** + **Testing Library** — tests unitaires

---

## Choix techniques & arbitrages

### Gestion des filtres

L'énoncé était volontairement vague. Mon interprétation : les filtres disponibles sont fournis par une API (mockée ici via `/public/filters.json`), et les filtres actifs sont persistés pour l'utilisateur.

J'ai mis en place deux niveaux de persistance :
- **LocalStorage** — survit au refresh
- **Redux** — source de vérité unique pour le state en session

J'ai envisagé d'ajouter les **query params dans l'URL** pour permettre de partager une configuration de filtres (`?name=Theros&foilOnly=true`). La solution propre aurait été un middleware Redux interceptant les actions de filtrage pour mettre à jour l'URL de façon synchrone, sans re-render. Par manque de temps, j'ai préféré ne pas l'inclure.

### Évolutivité des filtres

Le système est piloté par le JSON — ajouter un filtre dans `filters.json` met à jour l'affichage automatiquement. En revanche, brancher ce filtre sur le store nécessite encore 3 modifications manuelles :

1. `src/types/Filters.ts` → `ActiveFilters`
2. `src/utils/localStorage/storageKeys.ts` → `STORAGE_KEYS`
3. `src/features/filters/filtersSlice.ts` → `FILTER_STORAGE_MAP` + `initialState`

### Données MTGJson

J'ai choisi de récupérer tous les sets en une seule requête. Cela réduit le nombre d'appels réseau. Malheureusement, au vue du volume de data, un filtrage côté serveur serait à envisager.

J'ai délibérément évité de mettre les sets en cache (LocalStorage) : le risque de saturer le stockage du navigateur et la nécessité d'une date d'expiration auraient complexifié la solution sans réel bénéfice à cette échelle.

### Redux Toolkit sans RTK Query

RTK Query aurait apporté la gestion du cache réseau, mais introduisait une complexité difficile à justifier pour deux appels simples. Un `fetch` classique dans des hooks dédiés (`useSetList`, `useFilterList`) suffit et reste lisible.

### CSS Modules

Découverte pendant ce projet. La génération automatique de noms de classes scopés au composant évite les conflits sans nécessiter de convention de nommage stricte (BEM, etc.). Pas de framework CSS — tout est écrit manuellement avec des variables CSS globales pour la cohérence.

### Accessibilité

Palette vérifiée avec la [matrice de contraste accessible](https://toolness.github.io/accessible-color-matrix/?n=white&n=light&n=bright&n=medium&n=dark&n=black&v=E0E0E0&v=AFBBF2&v=00D85D&v=F0B7B3&v=7F0799&v=292E1E). Les couleurs sont volontairement contrastées. Navigation au clavier fonctionnelle, focus visible, `aria-label` sur les éléments interactifs, titres visuellement cachés mais lisibles par les lecteurs d'écran.

---

## Tests

**164 tests** sur 23 fichiers — coverage global **~95%** (statements, functions, lines).

J'aurais aimé ajouter des tests E2E avec Cypress pour couvrir le parcours complet — filtre → refresh → état restauré — mais le temps ne l'a pas permis.

---

## Bilan

Ce projet m'a permis de progresser sur TypeScript, que je pratique encore peu. J'ai utilisé un assistant IA pour l'autocomplétion, en vérifiant systématiquement les suggestions avec la documentation officielle.

J'aurais également aimé mettre en place **Husky** pour les hooks git (lint + tests avant chaque commit), mais j'ai préféré prioriser les fonctionnalités demandées.
