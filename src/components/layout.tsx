
import Header from '../pages/header/header'

interface layoutProps {
    userId: number | null
}

const layout: React.FC<layoutProps> = ({ userId }) => (
    <div>
        <Header userId={userId} />
    </div>
);

export default layout;