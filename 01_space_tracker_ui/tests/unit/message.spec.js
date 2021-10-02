import { shallowMount } from '@vue/test-utils'
import Message from '@/components/Message'

describe('Message', () => {
  it('renders props.message when passed', () => {
    const message = 'new message'
    const wrapper = shallowMount(Message, {
      props: { message },
    })
    expect(wrapper.text()).toMatch(message)
  })
})
