interface FilterInputRangeProps {
    id: string;
    label: string;
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
    classNames?: {
        group?: string;
        wrapper?: string;
        values?: string;
        input?: string;
    };
}

const FilterInputRange = ({id, label, value, min, max, onChange, classNames}: FilterInputRangeProps) => (
    <div className={classNames?.group}>
        <span>{label}</span>
        <div className={classNames?.wrapper}>
            <div className={classNames?.values}>
                <span>{min}</span>
                <span>{value}</span>
            </div>
            <input
                id={id}
                type="range"
                min={min}
                max={max}
                value={value}
                className={classNames?.input}
                onChange={(e) => onChange(Number(e.target.value))}
            />
        </div>
    </div>
);

export default FilterInputRange;