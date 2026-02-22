interface FilterInputTextProps {
    id: string;
    label: string;
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
    classNames?: {
        group?: string;
        label?: string;
        input?: string;
    };
}

const FilterInputText = ({id, label, value, placeholder, onChange, classNames}: FilterInputTextProps) => (
    <div className={classNames?.group}>
        <label htmlFor={id} className={classNames?.label}>
            {label}
        </label>
        <input
            id={id}
            type="text"
            value={value}
            placeholder={placeholder}
            className={classNames?.input}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

export default FilterInputText;