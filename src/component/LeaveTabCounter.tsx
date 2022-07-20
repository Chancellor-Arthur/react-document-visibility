import React, {useEffect} from 'react';
import {useDocumentVisibility} from "../hook/react-document-visibility";

const LeaveTabCounter = () => {
    const {count, visible, onVisibilityChange} = useDocumentVisibility();

    useEffect(() => {
        onVisibilityChange((isVisible: boolean) => {
            console.log('first handler', isVisible);
        });
        onVisibilityChange((isVisible: boolean) => {
            console.log('second handler', isVisible);
        });
    }, []);

    return (
        <div>
      <span>
        Вы покинули страницу: {count} раз
        Вкладка активна? {visible ? 'да' : 'нет'}
      </span>
        </div>
    );
};

export default LeaveTabCounter;