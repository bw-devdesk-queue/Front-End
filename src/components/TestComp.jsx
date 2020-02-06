import React from 'react';
import { useStore } from 'react-redux';

export default () => {
    const state = useStore().getState();

    console.log(state);

    return (
        <h1>Test Page, Check Console</h1>
    );
}