interface NavigationItem  {
    id: number;
    title: string;
    link: string;
    isActive: boolean
    icon: any; 
}

export type Navigation = NavigationItem[]