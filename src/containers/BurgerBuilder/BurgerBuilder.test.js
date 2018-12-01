import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Spinner from '../../components/UI/Spinner/Spinner';

configure({
    adapter: new Adapter()
});

describe('<BurgerBuilder />', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => { }} />);
    });

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({ ingredients: { salad: 0 } });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

    it('should not render <Spinner /> when receiving ingredients', () => {
        wrapper.setProps({ ingredients: { salad: 0 } });
        expect(wrapper.find(Spinner)).toHaveLength(0);
    });

    it('should not render <BuildControls /> when not receiving ingredients', () => {
        wrapper.setProps({ ingredients: null });
        expect(wrapper.find(BuildControls)).toHaveLength(0);
    });

    it('should render <Spinner /> when not receiving ingredients', () => {
        wrapper.setProps({ ingredients: null });
        expect(wrapper.find(Spinner)).toHaveLength(1);
    });
});