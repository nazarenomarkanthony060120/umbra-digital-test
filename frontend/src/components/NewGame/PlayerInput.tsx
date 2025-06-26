interface PlayerInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  disabled?: boolean
  maxLength?: number
}

export default function PlayerInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  maxLength = 20,
}: PlayerInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 border text-slate-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        required
      />
    </div>
  )
}
