import type { ExtractPropTypes } from 'vue'
import { SELECT_EVENT } from '../_constants'
import { commonProps, isString, makeArrayProp } from '../_utils'

export const timedetailProps = {
  ...commonProps,
  /**
   * @description 可选择的时间，数组元素同 `current-time`
   */
  times: makeArrayProp<any>([]),
}

export type TimeDetailProps = ExtractPropTypes<typeof timedetailProps>

export const timedetailEmits = {
  [SELECT_EVENT]: (time: string) => isString(time),
}

export type TimeDetailEmits = typeof timedetailEmits
