import * as React from 'react';
import Modal from 'react-modal';
import { browser } from 'webextension-polyfill-ts';
import { useState, useEffect } from 'react';
import { useMessage } from '../i18n';

/**
 * Returns the contents of a file within the extension.
 * @param path The path to the file relative to the extension's manifest.json.
 */
export function useFile(path: string): string {
    const [data, setData] = useState('');

    async function getFile() {
        const response = await fetch(browser.runtime.getURL(path));
        setData(await response.text());
    }

    useEffect(() => {
        getFile();
    }, [path]);

    return data;
}

export interface FileViewerProps {
    /** Text to display on the button. */
    label: string;

    /**
     * The path to the text file to display.
     */
    file: string;

    /**
     * The text for the file viewer window's close button. If omitted, falls
     * back to `"@options_close_button"` from the current locale's messages.json.
     */
    closeText?: string;
}

const ModalStyle: Modal.Styles = {
    content: {
        width: 'fit-content',
    }
}

/**
 * Button which opens a window displaying the contents of a text file.
 */
export const FileViewer: React.FunctionComponent<FileViewerProps> = (props) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <span className="input button browser-style">
            <button onClick={openModal}>
                {props.label}
            </button>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="modal"
                overlayClassName="modal-overlay"
                style={ModalStyle}
                >
                <main>
                    <pre>
                        {useFile(props.file)}
                    </pre>
                </main>

                <footer>
                    <button onClick={closeModal}>
                        {useText(props.closeText, CloseButtonText)}
                    </button>
                </footer>
            </Modal>
        </span>
    )
}

interface TextItem {
    message: string;
    fallback: string;
}

const CloseButtonText: TextItem = {
    message: '@options_close_button',
    fallback: 'Close',
};

function useText(propText: string | undefined, text: TextItem) {
    const message = useMessage(text.message);

    return propText || message || text.fallback;
}
