const identify = require('./identify');

describe('identify.js', () => {
    let github, context, core, body, number, sender;

    beforeEach(() => {
        github = {
            rest: {
                issues: {
                    addLabels: jest.fn(),
                    removeLabel: jest.fn(),
                    createComment: jest.fn(),
                    get: jest.fn(),
                },
                pulls: {
                    update: jest.fn(),
                },
            },
        };
        context = {
            repo: {
                owner: 'owner',
                repo: 'repo',
            },
            runId: 'runId',
        };
        core = {
            debug: jest.fn(),
            info: jest.fn(),
            warning: jest.fn(),
            exportVariable: jest.fn(),
        };
        number = 'number';
        sender = 'sender';
    });

    test('identifies valid routes', async () => {
        body = '```routes\nvalid route\n```';
        await identify({ github, context, core }, body, number, sender);
        expect(core.info).toHaveBeenCalledWith('routes detected: valid route');
        expect(core.exportVariable).toHaveBeenCalledWith('TEST_CONTINUE', true);
    });

    test('handles no valid routes', async () => {
        body = '```routes\ninvalid route\n```';
        await identify({ github, context, core }, body, number, sender);
        expect(core.warning).toHaveBeenCalledWith('Seems like no valid routes can be found. Failing.');
    });
});
