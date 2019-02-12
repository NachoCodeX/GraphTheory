import { t } from '../../';

describe("Test index", () => {

    it("should export a test function which should return TEST WORKING!", () => {
        expect(t.test()).toBe("TEST WORKING!");
    });


});