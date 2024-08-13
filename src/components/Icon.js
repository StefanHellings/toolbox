/* https://lucide.dev/icons/ */
import {
    ArrowLeftRight,
    BookOpenCheck,
    BookType,
    ChevronLeft,
    Clipboard,
    ClipboardCheck,
    Dot,
    Home,
    LayoutGrid,
    LineChart,
    Mail,
    Menu,
    Package,
    Package2,
    PocketKnife,
    ShoppingCart,
    Users,
} from 'lucide-react';

const iconLookup = {
    ArrowLeftRight,
    BookOpenCheck,
    BookType,
    ChevronLeft,
    Clipboard,
    ClipboardCheck,
    Dot,
    Home,
    LayoutGrid,
    LineChart,
    Mail,
    Menu,
    Package,
    Package2,
    PocketKnife,
    ShoppingCart,
    Users,
};

export default function Icon(props) {
    const IconComponent = iconLookup[(props.name in iconLookup) ? props.name : 'Dot'];

    return <IconComponent {...props} />;
}
