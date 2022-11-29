# Tests and Mocks

## Notes

### Basics on testing (in our jest node environments)

- a test will pass unless it has something to fail
- this is why asynchronous testing is a trick to learn: it will send off the asynchronous functionality in the background and then the current test has nothing in the thread to run so it passes (even though later when the asynchronous func gets run, it may fail but its too late)
- AAA is a good way of thinking about the archtecture of a test
  - Arrange: Create objects, set up mocks etc
  - Act: Invoke the functionality you are testing
  - Assert: Set up conditions that should be met
  - if theres a lot of arranging we may use before / before each hooks to help some of the repetitiveness

### Unit testing

- smallest testable part, isolated from other functionality
- classically, these form the largest part of your test suite
- if you have any functional dependencies (i.e. dependency injection) these would be mocked. this is different to a function just _using_ another function

### Integration testing

- testing multiple units together. if you have a chain of 3 things you can test all 3 together but also combinations of 2 of them together eg. functions `ABC` can be tested as `ABC` as well as `AB` and `BC`

### Mocking

Mocking is a technique to isolate test subjects by replacing dependencies with objects that you can control and inspect. A dependency can be anything your subject depends on, but it is typically a module that the subject imports.

The goal for mocking is to replace something we don’t control with something we do, so it’s important that what we replace it with has all the features we need.

With mocks we can set a defined return value and/or change the implementation of that functionality

```js
fnIwantToMock = jest.fn() => {} // sets up a 'blank' function e.g.

//is the same as
fnIwantToMock = function myOwnMock() {}
```

Jest mocks can be set up to have default return values, resovled values (if async) or have individual returns per test

```js
jest.fn(() => {
  /*default functionlality and return of this mock */
});
jest
  .fn()
  .mockImplementation(/*default functionlality and return of this mock */); // same as above

jest.fn().mockReturnValue(/* default return value for all tests*/);
jest.fn().mockReturnValueOnce(/* default return value for JUST THIS test*/);

jest.fn().mockResolvedValue(/* default resolved value for all tests*/);
jest.fn().mockResolvedValueOnce(/* default resolved value for JUST THIS test*/);
```

You can create fake functions if you need to provide a function to another function (dependency injection).
But more likely you would want to mock any further calls made by your own function. This is where we'd mock those functions as modules using `jest.mock`.

`jest.mock` will mock all functions exported from a module/file by default and set them to `jest.fn()`. How these functions are exported will change the syntax of your `jest.mock` You can have granular control over the mock implementation / return value for each one by passing an extra argument

```js
jest.mock("../src/my-great-func"); // the default export of this file is set to jest.fn
jest.mock("../src/my-great-func", () => ({
  helper: jest.fn(),
  fetcher: jest.fn(() => {
    status: 200;
  }),
})); // the named export helper is now set to jest.fn(), and fetcher to a specific mock implementation
```

## Tasks

1. Work on the operations functions / tests. The solutions have already been written so you can focus on the difference in mocking named versus default exports. Keep in mind AAA.

2. Work on the calculator function. The solution to this hasn't been written.
   It should take 2 numbers, a and b as well as an operator function.
   Consider how you would UNIT test this (i.e. it should be irrelevant which operator function is passed) and how you could do an Integration test.

3. Work on the makepayment testing. The solution has already been sorted so you can focus on testing
   Again consider how you may UNIT vs Integration test this.
   Extra: Note that the function has some mutating behaviour: consider how you could test both the output of the function and any other effects it has.
