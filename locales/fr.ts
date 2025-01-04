export default {
  home: {
    word: {
      plural: "Accueil",
      singular: "Accueil",
    },
    description: "Bienvenue, explorez votre tableau de bord",
  },
  transaction: {
    word: {
      plural: "Transactions",
      singular: "Transaction",
    },
    description: "Gérez vos transactions",
    create: {
      title: "Créer une transaction",
      subtitle: "Créez une nouvelle transaction",
    },
    edit: {
      title: "Éditer une transaction",
      subtitle: "Modifier une transaction existante",
    },
  },
  expense: {
    word: {
      plural: "Dépenses",
      singular: "Dépense",
    },
    description: "Gérez vos dépenses",
  },
  income: {
    word: {
      plural: "Revenus",
      singular: "Revenu",
    },
    description: "Gérez vos revenus",
  },
  uncategorized: {
    word: {
      plural: "Non classées",
      singular: "Non classé",
    },
    description: "Gérez vos transactions non classées",
  },
  category: {
    word: {
      plural: "Catégories",
      singular: "Catégorie",
    },
    description: "Gérez vos catégories",
    create: {
      title: "Créer une catégorie",
      subtitle: "Créez une nouvelle catégorie",
    },
    edit: {
      title: "Éditer une catégorie",
      subtitle: "Modifier une catégorie existante",
    },
  },
  limit: {
    word: {
      plural: "Limites",
      singular: "Limite",
    },
    description: "Gérez vos limites de dépenses par catégorie",
  },
  economy: {
    word: {
      plural: "Économies",
      singular: "Économie",
    },
    description: "Aperçu de votre économie",
  },
  budget: {
    word: {
      plural: "Budgets",
      singular: "Budget",
    },
    detail: {
      noRecord: "Pas de budget",
      restart: "Quand un budget se termine, il recommencera automatiquement.",
      timeline: "Vous pouvez gérer les périodes de votre budget via l'icône d'édition.",
    },
    description: "Gérez vos budgets",
    create: {
      title: "Créer un budget",
      subtitle: "Créez un nouveau budget",
    },
    edit: {
      title: "Éditer un budget",
      subtitle: "Modifier un budget existant",
    },
  },
  goal: {
    word: {
      plural: "Objectifs",
      singular: "Objectif",
    },
    detail: {
      noRecord: "Aucun objectif",
      restart: "Quand un objectif se termine, il restera affiché.",
      timeline: "Vous pouvez modifier la date de fin d'un objectif via le bouton d'édition.",
    },
    description: "Gérez vos objectifs",
    create: {
      title: "Créer un objectif",
      subtitle: "Créez un nouvel objectif",
    },
    edit: {
      title: "Éditer un objectif",
      subtitle: "Modifier un objectif existant",
    },
  },
  common: {
    word: {
      name: "Nom",
      description: "Description",
      icon: "Icône",
      path: "Chemin",
      children: "Enfants",
      date: "Date",
      amount: "Montant",
      type: "Type",
      monthly: "Mensuel",
      quarterly: "Trimestriel",
      biyearly: "Bi-annuel",
      yearly: "Annuel",
      edit: "Éditer",
      close: "Fermer",
      save: "Sauvegarder",
      saving: "Sauvegarde...",
      search: "Rechercher",
      all: "Tous",
    },
    month: {
      january: "Janvier",
      february: "Février",
      march: "Mars",
      april: "Avril",
      may: "Mai",
      june: "Juin",
      july: "Juillet",
      august: "Août",
      september: "Septembre",
      october: "Octobre",
      november: "Novembre",
      december: "Décembre",
    },
    sentence: {
      dateEnd: "Date de fin",
      startMonth: "Mois de début",
      endMonth: "Mois de fin",
      startYear: "Année de début",
      endYear: "Année de fin",
      noBudget: "Pas de budget",
    },
  }
} as const;
