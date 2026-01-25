import RecentSearchItem from './RecentSearchItem';

type Props = {
    keywords: string[];
    onSelect: (keyword: string) => void;
    onRemove: (keyword: string) => void;
};

const RecentSearchList = ({
    keywords,
    onSelect,
    onRemove,
}: Props) => {
    if (keywords.length === 0) return null;

    return (
        <div>
            <ul>
                <li
                    className='flex flex-row gap-[6px]'>
                    {keywords.map(keyword => (
                        <RecentSearchItem
                            key={keyword}
                            keyword={keyword}
                            onSelect={onSelect}
                            onRemove={onRemove}
                        />
                    ))}
                </li>
            </ul>
        </div>
    );
};

export default RecentSearchList;
