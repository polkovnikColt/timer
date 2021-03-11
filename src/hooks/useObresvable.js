import {useState, useEffect} from 'react';

export const useObservable = (observer,init =  0) => {
    const [state, setState] = useState(init);

    useEffect(() => {
        let sub = observer.subscribe(setState)
        return () => sub.unsubscribe();
    }, [])

    return state;
}