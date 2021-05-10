
// Method Decorators
export function writable(isWritable: boolean) {
    return function(target: object | Function, methodName: string, descriptor: PropertyDescriptor) {
        descriptor.writable = isWritable;
        return descriptor;
    };
}

export function timeout(ms: number) {
    return function(target: object | Function, methodName: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {
            setTimeout(() => {
                return originalMethod.apply(this, args);
            }, ms);
        };

        return descriptor;
    };
}

export function logMethod(target: object | Function, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
        const key = `${methodName}_decor_params_indexes`;
        const indexes = target[key];

        if (Array.isArray(indexes)) {
            args.forEach((arg, index) => {
                if (indexes.indexOf(index) !== -1) {
                    console.log(`Method: ${methodName}, ParamIndex: ${index}, ParamValue: ${arg}`);
                }
            });
        }

        return originalMethod.apply(this, args);
    };

    return descriptor;
}

// Parameter Decorators
export function logParameter(target: object | Function, methodName: string, index: number) {
    const key = `${methodName}_decor_params_indexes`;

    if (Array.isArray(target[key])) {
        target[key].push(index);
    } else {
        target[key] = [index];
    }
}

// Property Decorator
function makeProperty<T>(
    prototype: any,
    propertyName: string,
    getTransformer: (value: any) => T,
    setTransformer: (value: any) => T
) {
    const values = new Map<any, T>();
    Object.defineProperty(prototype, propertyName, {
        set(firstValue: any) {
            Object.defineProperty(this, propertyName, {
                get() {
                    if (getTransformer) {
                        return getTransformer(values.get(this));
                    } else {
                        values.get(this);
                    }
                },
                set(value: any) {
                    if (setTransformer) {
                        values.set(this, setTransformer(value));
                    } else {
                        values.set(this, value);
                    }
                },
                enumerable: true
            });
            this[propertyName] = firstValue;
        },
        enumerable: true,
        configurable: true
    });
}

export function format(pref: string = 'Mr./Mrs.') {
    return function (target: object, propertyName: string) {
        makeProperty(
            target,
            propertyName,
            value => `${pref} ${value}`,
            value => value
        );
    };
}

// Accessor decorator
export function positiveInteger(target: object, propertyName: string, descriptor: PropertyDescriptor) {
    const originalSet = descriptor.set;

    descriptor.set = function(value: number) {
        if (value < 1 || !Number.isInteger(value)) {
            throw new Error('Invalid value');
        }

        // TODO: check if it is correct
        originalSet.call(value);
    };

    return descriptor;
}
