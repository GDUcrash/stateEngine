import * as util from './util.js';

export const createElement = (tag, props, ...children) => {
    // for class constructors
    if(typeof tag == 'function') {
        let inst = new tag();

        // add the props and the events
        Object.entries(props || {}).forEach(([name, value]) => {
            // add the "on" events
            if(name.startsWith('on')) {
                if(util.isFunction(inst.on)) {
                    inst.on(name.slice(2).toLowerCase(), value);
                }
                return;
            }

            // add the props
            if(value !== null && value !== undefined) inst[name] = value;
        });

        // add the children
        if(children) inst.children = children;
        
        return inst;
    } else {
    // for HTML elements
        const element = document.createElement(tag);

        Object.entries(props || {})
            .forEach(([name, value]) => 
                element.setAttribute(name, value.toString()));

        children.forEach((child) => {
            appendChild(element, child);
        });

        return element;
    }
}

export const appendChild = (parent, child) => {
	if (Array.isArray(child))
		child.forEach((nestedChild) => appendChild(parent, nestedChild));
	else {
		if(child.nodeType) parent.appendChild(child);
        else if(util.isFunction(child.render)) parent.appendChild(child.render());
    }
}