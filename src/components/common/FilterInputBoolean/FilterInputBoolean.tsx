interface FilterInputBooleanProps {
    id: string;
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
    classNames?: {
        label?: string;
        input?: string;
    };
}

const FilterInputBoolean = ({id, label, checked, onChange, classNames}: FilterInputBooleanProps) => (
    <div>
        <label htmlFor={id} className={classNames?.label}>
            <input
                id={id}
                type="checkbox"
                checked={checked}
                className={classNames?.input}
                onChange={(e) => onChange(e.target.checked)}
            />
            {label}
        </label>
    </div>
);

export default FilterInputBoolean;

