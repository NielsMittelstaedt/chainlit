import { IInput } from '@/types';
import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { InputStateHandler } from './InputStateHandler';

interface SelectItemType {
  label: string;
  icon?: React.ReactNode;
  notificationCount?: number;
  value: string | number;
}

interface SelectInputProps extends IInput {
  items?: SelectItemType[];
  value?: string | number;
  onChange: (value: string) => void;
  setField?: (field: string, value: string, shouldValidate?: boolean) => void;
  placeholder?: string;
}

const SelectInput = ({
  id,
  hasError,
  description,
  label,
  tooltip,
  disabled = false,
  items = [],
  value,
  onChange,
  setField,
  placeholder = 'Select',
  className
}: SelectInputProps) => {
  return (
    <InputStateHandler
      id={id}
      hasError={hasError}
      description={description}
      label={label}
      tooltip={tooltip}
    >
      <div className="relative">
        <Select
          disabled={disabled}
          value={value?.toString()}
          onValueChange={(v) => {
            onChange(v);
            setField?.(id, v);
          }}
        >
          <SelectTrigger id={id} className={className}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent
            position="popper"
            className="!bg-white dark:!bg-gray-950 !border"
            forceMount
            style={{
              zIndex: 99999,
              position: 'fixed',
              pointerEvents: 'auto',
              backgroundColor: 'var(--background, white)',
              borderRadius: '0.375rem',
              boxShadow:
                '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              border: '1px solid var(--border, #e5e7eb)',
              padding: '0.5rem',
              width: 'var(--radix-select-trigger-width)'
            }}
            avoidCollisions={false}
            portal={{
              container: document.body
            }}
          >
            <div className="bg-white dark:bg-gray-950 rounded-md overflow-hidden">
              {items.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value.toString()}
                  className="bg-white hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                    {item.notificationCount && (
                      <span className="ml-auto bg-muted rounded-full px-2 py-0.5 text-xs">
                        {item.notificationCount}
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      </div>
    </InputStateHandler>
  );
};

export { SelectInput };
export type { SelectItemType, SelectInputProps };
