sc.controller('TaskMessageCtrl', function ($rootScope, $scope, $state, $filter, session) {
    $scope.getInvitesLeft = function () {
        return $filter('unsentInviteFilter')(session.getUser().getInvites());
    };

    $scope.inviteTasks = {
        hasInviteCode: {
            getText: function () {
                return "Your friend sent you an invite code.";
            },
            getSubtext: function () {
                return "Get your bonus stellars now!";
            },
            getButtonText: function () {
                return "Claim stellars";
            },
            action: function () {
                $rootScope.$broadcast('openFacebookReward');
                $scope.task = null;
            }
        },
        hasNewInvites: {
            getText: function () {
                if($scope.newInvites>1)
                    return "You have received " + $scope.newInvites + " new invites for your friends!";
                else return "You have received " + $scope.newInvites + " new invite for your friends!";
            },
            getSubtext: function () {
                return "";
            },
            getButtonText: function () {
                return "Send Invites";
            },
            action: function () {
                $state.transitionTo('invites');
                $scope.task = null;
            }
        }
    }

    $scope.task = null;

    function loadTasks() {
        var user = session.getUser();
        if (!user) {
            return;
        }
        if (user.getInviteCode() && !user.hasClaimedInviteCode()) {
            $scope.task = $scope.inviteTasks['hasInviteCode'];
        } else if (user.getNewInvites().length > 0) {
            $scope.newInvites = user.getNewInvites().length;
            $scope.task = $scope.inviteTasks['hasNewInvites'];
        }
    }

    $scope.$on('userLoaded', function () {
        loadTasks();
    });
});