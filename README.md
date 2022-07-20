## @chancellor-arthur/react-document-visibility

## Implemented react hook, which

##### will tell if the browser tab is active (visible) now

##### will tell you how many times since the component was initialized the tab has become inactive (invisible)

##### will provide a function in which you can subscribe to a change in the activity (visibility) of the current tab

## Hook example

    import React, {useEffect} from 'react';
    import {useDocumentVisibility} from "@chancellor-arthur/react-document-visibility";

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