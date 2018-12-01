import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({
    adapter: new Adapter()
});

describe('<NavigationItems />', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should redner two <NavigationItem /> if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should redner three <NavigationItem /> if authenticated', () => {
        wrapper.setProps({
            isAuthenticated: true
        });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should redner <NavigationItem link=\'/logout\'>Logout</NavigationItem> if authenticated', () => {
        wrapper.setProps({
            isAuthenticated: true
        });
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
    });

    it('should not redner <NavigationItem link=\'/logout\'>Logout</NavigationItem> if not authenticated', () => {
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(false);
    });

    it('should redner <NavigationItem link=\'/orders\'>Orders</NavigationItem> if authenticated', () => {
        wrapper.setProps({
            isAuthenticated: true
        });
        expect(wrapper.contains(<NavigationItem link='/orders'>Orders</NavigationItem>)).toEqual(true);
    });

    it('should not redner <NavigationItem link=\'/orders\'>Orders</NavigationItem> if not authenticated', () => {
        expect(wrapper.contains(<NavigationItem link='/orders'>Orders</NavigationItem>)).toEqual(false);
    });

});