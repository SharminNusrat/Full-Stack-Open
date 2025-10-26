```mermaid
    sequenceDiagram
        participant browser
        participant server

        
        browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
        activate server
        Note right of browser: Browser creates a note object with javascript and sends the data to the server
        server-->>browser: 201 created (No redirection response)
        deactivate server
```