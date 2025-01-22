/* https://lucide.dev/icons/ */
import {
    ArrowLeftRight,
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
    WandSparkles,
    Users,
} from 'lucide-react';

const iconLookup = {
    ArrowLeftRight,
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
    WandSparkles,
    Users,
};

export default function Icon(props) {
    const IconComponent = iconLookup[(props.name in iconLookup) ? props.name : 'Dot'];

    return <IconComponent {...props} />;
}
