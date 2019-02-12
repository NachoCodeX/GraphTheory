import Greeter = App.Greeter;

export const t: Greeter & any = {
    greet(name?: string): void {
        console.log(`Hello ${name!.length > 0 ? name : "World"}`);
    },
    test(): string {
        return "TEST WORKING!";
    }
};

t.greet("Nacho");
console.log("Works!!");
