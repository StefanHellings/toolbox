type Tool = {
    path: string;
    title: string;
    description: string;
    icon: string;
};

export const toolsRegistry: Tool[] = [
    {
        path: 'db-normalisation-converter',
        title: 'DB normalisation',
        description: 'Convert Rich Text into a table in Markdown',
        icon: 'BookType',
    },
    {
        path: 'prefab-emails',
        title: 'Pre-fabricated emails',
        description: 'Select an email-template and fill in the fields',
        icon: 'Mail',
    },
    {
        path: 'diffchecker',
        title: 'Diff Checker',
        description: 'Check the difference between 2 inputs',
        icon: 'BookOpenCheck',
    },
    // {
    //     path: 'orders',
    //     title: 'Orders',
    //     description: 'Description for Orders',
    //     icon: 'ShoppingCart',
    // },
    // {
    //     path: 'products',
    //     title: 'Products',
    //     description: 'Description for Products',
    //     icon: 'Package',
    // },
    // {
    //     path: 'customers',
    //     title: 'Customers',
    //     description: 'Description for Customers',
    //     icon: 'Users',
    // },
    // {
    //     path: 'analytics',
    //     title: 'Analytics',
    //     description: 'Description for Analytics',
    //     icon: 'LineChart',
    // },
];
