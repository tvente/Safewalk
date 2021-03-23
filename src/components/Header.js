import React from 'react';
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import '../App.css';

function Header() {
    return (
        <AppBar className='appbar' position='static'>
            <Toolbar className='toolbar'>
                <Typography className='title' variant='h6'>
                    Safewalk
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
export default Header;