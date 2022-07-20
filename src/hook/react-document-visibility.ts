import {useCallback, useEffect, useRef, useState} from "react";

interface Listener {
    node: Node;
    handler: () => void;
    capture: boolean;
}

export const useDocumentVisibility = () => {
    const getDocumentHiddenBack = () => typeof document !== "undefined" ? document.visibilityState === "visible" : true;

    const [count, setCount] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(getDocumentHiddenBack());

    let eventHandlers = useRef<Record<string, Array<Listener>>>({});

    const addListener = (node: Node, event: string, handler: () => void, capture = false) => {
        if (eventHandlers.current) {

            if (!(event in eventHandlers.current)) {
                eventHandlers.current[event] = [];
            }

            eventHandlers.current[event].push({node: node, handler: handler, capture: capture});
            node.addEventListener(event, handler, capture);
        }
    }

    const removeAllListeners = (targetNode: Node, event: string) => {
        if (eventHandlers.current) {

            eventHandlers.current[event]
                .filter(({node}) => node === targetNode)
                .forEach(({node, handler, capture}) =>
                    node.removeEventListener(event, handler, capture));

            eventHandlers.current[event] = eventHandlers.current[event]
                .filter(({node}: any) => node !== targetNode)
        }
    }

    const onVisibilityChange: (callback: (isVisible: boolean) => void) => void = useCallback(callback => {
        const assistantFunc: () => void = () => callback(document.visibilityState === "visible");
        addListener(document, "visibilitychange", assistantFunc);
    }, []);

    useEffect(() => {
        onVisibilityChange(() => {
            if (document.visibilityState === "hidden") {
                setCount(count => count + 1);
                setVisible(false);
            } else {
                setVisible(true);
            }
        });
        return () => {
            removeAllListeners(document, "visibilitychange");
        }
    }, []);

    return {count, visible, onVisibilityChange};
}