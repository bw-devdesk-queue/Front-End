import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/utils';

import { useRouteMatch, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//import { assignTicket, deleteTicket, logout }  from '../actions/actions';