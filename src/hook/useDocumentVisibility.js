import {useEffect, useState} from "react";

export const useDocumentVisibility = () => {
    const [count, setCount] = useState(0);
    const [visible, setVisible] = useState(document.visibilityState === "visible");

    let eventHandlers = {};

    const addListener = (node, event, handler, capture = false) => {
        if (!(event in eventHandlers)) {
            eventHandlers[event] = [];
        }
        eventHandlers[event].push({node: node, handler: handler, capture: capture});
        node.addEventListener(event, handler, capture);
    }

    const removeAllListeners = (targetNode, event) => {
        eventHandlers[event]
            .filter(({node}) => node === targetNode)
            .forEach(({node, handler, capture}) => node.removeEventListener(event, handler, capture));

        eventHandlers[event] = eventHandlers[event].filter(
            ({node}) => node !== targetNode,
        )
    }

    const onVisibilityChange = callback => {
        const assistantFunc = () => callback(document.visibilityState === "visible");
        addListener(document, "visibilitychange", assistantFunc);
    }

    onVisibilityChange(() => {
        if (document.visibilityState === "hidden") {
            setCount(count + 1);
            setVisible(false);
        } else {
            setVisible(true);
        }
    });

    useEffect(() => {
        return () => {
            removeAllListeners(document, 'visibilitychange');
        }
    }, []);

    return {count, visible, onVisibilityChange};
}