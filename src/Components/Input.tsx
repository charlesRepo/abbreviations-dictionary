import React from 'react';

interface InputProps {
  /**
   * Callback function triggered on key up event
   */
  onKeyUp: React.KeyboardEventHandler<HTMLInputElement>;
  /**
   * Callback function triggered when input value changes
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Current value of the input
   */
  value: string;
  /**
   * Whether the input should be focused on mount
   */
  autoFocus?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

const Input: React.FC<InputProps> = ({
  onKeyUp,
  onChange,
  value,
  autoFocus = false,
  className = '',
}) => {
  return (
    <div className={className}>
      <label htmlFor="termInput" className="block text-sm font-medium text-slate-400 mb-1">
        Search Abbreviations
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-4 w-4 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          name="termInput"
          id="termInput"
          className="block w-full rounded-md border border-slate-600 bg-slate-700 text-slate-200 placeholder-slate-400 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition-colors"
          placeholder="Start typing an abbreviation..."
          onKeyUp={onKeyUp}
          onChange={onChange}
          value={value}
          autoFocus={autoFocus}
          autoComplete="off"
          aria-label="Search for an abbreviation"
        />
      </div>
    </div>
  );
};

export default Input;