import React from 'react';
import BalanceSheet from 'components/BalanceSheet';
import styles from './App.module.css';

const App: React.FC = () => {
    return (
        <div className={styles.App}>
            <header className={styles.App__header}>
                <h2 className={styles.App__header__h2}>Xero Balance Sheet</h2>
            </header>
            <BalanceSheet></BalanceSheet>
        </div>
    );
};

export default App;
