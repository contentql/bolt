// import { SelectInput } from '@payloadcms/ui/fields/Select';
// import { LabelFunction } from 'payload/config'
import { HiOutlineBookOpen } from 'react-icons/hi'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/Select'

const IconField = () => {
  return (
    <div>
      <label>Icon</label>
      {/* <SelectInput
        options={[
          {
            label: 'Hello',
            value: 'hello',
          },
        ]}
      /> */}

      <Select>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Select a icon' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='light'>
            <HiOutlineBookOpen />
            Light
          </SelectItem>
          <SelectItem value='dark'>Dark</SelectItem>
          <SelectItem value='system'>System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default IconField
