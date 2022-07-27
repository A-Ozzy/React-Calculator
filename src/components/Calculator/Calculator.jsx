import React, { useState } from 'react';
import { Container, Current, Previous, Button, Screen } from './Styled';
// import PropTypes from 'prop-types';

// Calculator.propTypes = {

// };

export default function Calculator() {
   const [current, setCurrent] = useState('');
   const [previous, setPrevious] = useState('');
   const [operation, setOperation] = useState('');

   const appendValue = (el) => {

      const value = el.target.getAttribute('data');
      if (value === '.' && current.includes('.')) return
      setCurrent(current + value);
   };

   const hendleDelete = () => {
      if (current.length > 0) {
         setCurrent(String(current).slice(0, -1));
      }
   };

   const hendleAllCleare = () => {
      setCurrent('');
      setPrevious('');
      setOperation('');
   };

   const chooseOperation = (e) => {
      if (current === '') return
      if (previous !== '') {
         let value = compute();
         setPrevious(value);
      } else {
         setPrevious(current);
      }
      setCurrent('');
      setOperation(e.target.getAttribute('data'));
   };

   const compute = () => {
      let result;
      let prevNumber = parseFloat(previous);
      let currNumber = parseFloat(current);

      if (isNaN(prevNumber) || isNaN(currNumber)) return

      switch (operation) {
         case '÷':
            result = prevNumber / currNumber;
            break;
         case 'x':
            result = prevNumber * currNumber;
            break;
         case '+':
            result = prevNumber + currNumber;
            break;
         case '-':
            result = prevNumber - currNumber;
            break;
         default:
            return
      }
      return result
   };

   const hendleEquals = () => {
      let value = compute();
      if (value === undefined || value === null) return

      setCurrent(value);
      setPrevious('');
      setOperation('');
   };


   return (
      <div>
         <Container>
            <Screen>
               <Previous>{previous} {operation}</Previous>
               <Current>{current}</Current>
            </Screen>
            <Button gridSpan={2} onClick={hendleAllCleare} control>AC</Button>
            <Button control onClick={hendleDelete}>DEL</Button>
            <Button data={'÷'} onClick={chooseOperation} operation>÷</Button>
            <Button data={'7'} onClick={appendValue}>7</Button>
            <Button data={'8'} onClick={appendValue}>8</Button>
            <Button data={'9'} onClick={appendValue}>9</Button>
            <Button data={'x'} onClick={chooseOperation} operation>x</Button>
            <Button data={'4'} onClick={appendValue}>4</Button>
            <Button data={'5'} onClick={appendValue}>5</Button>
            <Button data={'6'} onClick={appendValue}>6</Button>
            <Button data={'+'} onClick={chooseOperation} operation>+</Button>
            <Button data={'1'} onClick={appendValue}>1</Button>
            <Button data={'2'} onClick={appendValue}>2</Button>
            <Button data={'3'} onClick={appendValue}>3</Button>
            <Button data={'-'} onClick={chooseOperation} operation>-</Button>
            <Button data={'.'} onClick={appendValue} period>.</Button>
            <Button data={'0'} onClick={appendValue}>0</Button>
            <Button gridSpan={2} onClick={hendleEquals} equals>=</Button>
         </Container>
      </div>

   );
};
